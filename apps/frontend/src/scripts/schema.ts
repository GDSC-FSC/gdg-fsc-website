/**
 * Copyright 2025 GDG on Campus Farmingdale State College
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use client';

/**
 * Describes the options for generating a Schema.org JSON-LD object.
 *
 * @public
 * @see https://schema.org/docs/schemas.html
 * @author Mike Odnis
 * @version 1.0.0
 */
export interface SchemaProps {
  /**
   * The Schema.org type for the object.
   * @type {SchemaType}
   * @readonly
   */
  type: SchemaType;
  /**
   * Headline for articles or news pieces.
   * @type {string}
   * @readonly
   */
  headline?: string;
  /**
   * Canonical URL for the schema.
   * @type {string}
   * @readonly
   */
  url: string;
  /**
   * Thumbnail URL for the content.
   * @type {string}
   * @readonly
   */
  thumbnailUrl?: string;
  /**
   * Date the item was published (ISO string).
   * @type {string}
   * @readonly
   */
  datePublished?: string;
  /**
   * Section in which the article appears.
   * @type {string}
   * @readonly
   */
  articleSection?: string;
  /**
   * Creator(s) of the content.
   * @type {string | string[]}
   * @readonly
   */
  creator?: string | string[];
  /**
   * Keywords associated with the content.
   * @type {string[]}
   * @readonly
   */
  keywords?: string[];
  /**
   * Name of the entity (for Organization, etc.).
   * @type {string}
   * @readonly
   */
  name?: string;
  /**
   * Logo URL for the entity.
   * @type {string}
   * @readonly
   */
  logo?: string;
  /**
   * Additional URLs related to the entity (social media, etc.).
   * @type {string[]}
   * @readonly
   */
  sameAs?: string[];
}

/**
 * Supported Schema.org types for structured data generation.
 * @public
 * @readonly
 * @see https://schema.org/docs/full.html
 * @author Mike Odnis
 * @version 1.0.0
 */
export type SchemaType = 'NewsArticle' | 'WebPage' | 'Organization' | 'Article' | 'BlogPosting';

export const generateSchema = (props: SchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': props.type,
    ...(props.headline && { headline: props.headline }),
    url: props.url,
    ...(props.thumbnailUrl && { thumbnailUrl: props.thumbnailUrl }),
    ...(props.datePublished && { datePublished: props.datePublished }),
    ...(props.articleSection && { articleSection: props.articleSection }),
    ...(props.creator && { creator: props.creator }),
    ...(props.keywords && { keywords: props.keywords }),
    ...(props.name && { name: props.name }),
    ...(props.logo && { logo: props.logo }),
    ...(props.sameAs && { sameAs: props.sameAs }),
  } as const;

  return schema;
};
