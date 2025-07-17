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

type SchemaType = 'NewsArticle' | 'WebPage' | 'Organization' | 'Article' | 'BlogPosting';

interface SchemaProps {
  type: SchemaType;
  headline?: string;
  url: string;
  thumbnailUrl?: string;
  datePublished?: string;
  articleSection?: string;
  creator?: string | string[];
  keywords?: string[];
  name?: string;
  logo?: string;
  sameAs?: string[];
}

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
  };

  return schema;
};
