export interface WriteWordOptions {
  writerSpeed?: number;
  waitProcessEndTime?: number;
}

export interface RemoveWordOptions {
  removeSpeed?: number;
}

export interface WriteAndRemoveWordOptions
  extends RemoveWordOptions,
    WriteWordOptions {
  waitProcessTime?: number;
  infinite?: boolean;
}

export interface WriteAndRemoveListOptions extends WriteAndRemoveWordOptions {
  waitWordTime?: number;
}
