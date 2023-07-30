/**
 * The contents of this file are subject to the license and copyright
 * detailed in the LICENSE and NOTICE files at the root of the source
 * tree and available online at
 *
 * http://www.dspace.org/license/
 */
import { LinkDefinition } from '../../core/services/link-head.service';
import { Renderer2 } from '@angular/core';

/* eslint-disable no-empty,@typescript-eslint/no-empty-function */
export class LinkHeadServiceStub {

  addTag(_tag: LinkDefinition): Renderer2 {
    return {} as any;
  }

  removeTag(_attrSelector: string): void {
  }

}
/* eslint-enable no-empty,@typescript-eslint/no-empty-function */
