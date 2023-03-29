export interface IFindByIdBaseOptions {
  relations?: string[];
}

export interface IFindAllBaseOptions {
  relations?: string[];
  withoutPaginate?: boolean;
}
