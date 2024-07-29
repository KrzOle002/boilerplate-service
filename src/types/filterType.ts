import { ParsedQs } from 'qs';

export type Filter = Pick<ParsedQs, 'name' | 'role'>;
export type Option = Pick<ParsedQs, 'sortBy' | 'limit' | 'page'>;
