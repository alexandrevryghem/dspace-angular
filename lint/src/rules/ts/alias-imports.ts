import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESLint,
  TSESTree,
} from '@typescript-eslint/utils';
import { Scope } from '@typescript-eslint/utils/ts-eslint';

import {
  DSpaceESLintRuleInfo,
  NamedTests,
} from '../../util/structure';

export enum Message {
  NO_ALIAS = 'noAlias',
  WRONG_ALIAS = 'wrongAlias',
  MULTIPLE_ALIASES = 'multipleAliases',
}

interface AliasImportOption {
  package: string;
  imported: string;
  local: string;
}

export const info: DSpaceESLintRuleInfo<[[AliasImportOption]]> = {
  name: 'alias-imports',
  meta: {
    docs: {
      description: 'Unclear imports should be aliased for clarity',
    },
    messages: {
      [Message.NO_ALIAS]: 'This import must be aliased',
      [Message.WRONG_ALIAS]: 'This import uses the wrong alias (should be {{ local }})',
      [Message.MULTIPLE_ALIASES]: 'This import was used twice with a different alias (should be {{ local }})',
    },
    fixable: 'code',
    type: 'problem',
    schema: [
      {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            package: { type: 'string' },
            imported: { type: 'string' },
            local: { type: 'string' },
          },
        },
      },
    ],
  },
  defaultOptions: [
    [
      {
        package: 'rxjs',
        imported: 'of',
        local: 'observableOf',
      },
    ],
  ],
};

export const rule = ESLintUtils.RuleCreator.withoutDocs({
  ...info,
  create(context: TSESLint.RuleContext<Message, unknown[]>, options: any) {
    return options[0].reduce((selectors: any, option: AliasImportOption) => {
      selectors[`ImportDeclaration[source.value = "${option.package}"] > ImportSpecifier[imported.name = "${option.imported}"][local.name != "${option.local}"]`] = (node: TSESTree.ImportSpecifier) => handleUnaliasedImport(context, option, node);
      return selectors;
    }, {});
  },
});

export const tests: NamedTests = {
  plugin: info.name,
  valid: [
    {
      name: 'correctly aliased imports',
      code: `
import { of as observableOf } from 'rxjs';
        `,
    },
  ],
  invalid: [
    {
      name: 'imports without alias',
      code: `
import { of } from 'rxjs';
        `,
      errors: [
        {
          messageId: 'noAlias',
        },
      ],
      output: `
import { of as observableOf } from 'rxjs';
        `,
    },
    {
      name: 'imports under the wrong alias',
      code: `
import { of as ofSomething } from 'rxjs';
        `,
      errors: [
        {
          messageId: 'wrongAlias',
        },
      ],
      output: `
import { of as observableOf } from 'rxjs';
        `,
    },
  ],
};

/**
 * Replaces the incorrectly aliased imports with the ones defined in the defaultOptions
 *
 * @param context The current {@link TSESLint.RuleContext}
 * @param option The current {@link AliasImportOption} that needs to be handled
 * @param node The incorrect import node that should be fixed
 */
function handleUnaliasedImport(context: TSESLint.RuleContext<Message, unknown[]>, option: AliasImportOption, node: TSESTree.ImportSpecifier): void {
  const hasAliasedImport: boolean = (node.parent as TSESTree.ImportDeclaration).specifiers.find((specifier: TSESTree.ImportClause) => specifier.local.name === option.local && specifier.type === AST_NODE_TYPES.ImportSpecifier && (specifier as TSESTree.ImportSpecifier).imported.name === option.imported) !== undefined;

  if (hasAliasedImport) {
    context.report({
      messageId: Message.MULTIPLE_ALIASES,
      data: { local: option.local },
      node: node,
      fix(fixer: TSESLint.RuleFixer) {
        const fixes: TSESLint.RuleFix[] = [];

        const commaAfter = context.sourceCode.getTokenAfter(node, {
          filter: (token: TSESTree.Token) => token.value === ',',
        });
        if (commaAfter) {
          fixes.push(fixer.removeRange([node.range[0], commaAfter.range[1]]));
        } else {
          fixes.push(fixer.remove(node));
        }
        fixes.push(...retrieveUsageReplacementFixes(context, fixer, node, option.local));

        return fixes;
      },
    });
  } else if (node.local.name === node.imported.name) {
    context.report({
      messageId: Message.NO_ALIAS,
      node: node,
      fix(fixer: TSESLint.RuleFixer) {
        const fixes: TSESLint.RuleFix[] = [];

        fixes.push(fixer.replaceText(node.local, `${option.imported} as ${option.local}`));
        fixes.push(...retrieveUsageReplacementFixes(context, fixer, node, option.local));

        return fixes;
      },
    });
  } else {
    context.report({
      messageId: Message.WRONG_ALIAS,
      data: { local: option.local },
      node: node,
      fix(fixer: TSESLint.RuleFixer) {
        const fixes: TSESLint.RuleFix[] = [];

        fixes.push(fixer.replaceText(node.local, option.local));
        fixes.push(...retrieveUsageReplacementFixes(context, fixer, node, option.local));

        return fixes;
      },
    });
  }
}

/**
 * Generates the {@link TSESLint.RuleFix}s for all the usages of the incorrect import.
 *
 * @param context The current {@link TSESLint.RuleContext}
 * @param fixer The instance {@link TSESLint.RuleFixer}
 * @param node The node which needs to be replaced
 * @param newAlias The new import name
 */
function retrieveUsageReplacementFixes(context: TSESLint.RuleContext<Message, unknown[]>, fixer: TSESLint.RuleFixer, node: TSESTree.ImportSpecifier, newAlias: string): TSESLint.RuleFix[] {
  return context.sourceCode.getDeclaredVariables(node)[0].references.map((reference: Scope.Reference) => fixer.replaceText(reference.identifier, newAlias));
}
