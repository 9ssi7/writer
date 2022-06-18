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
}

export interface WriteAndRemoveListOptions extends WriteAndRemoveWordOptions {
  waitWordTime?: number;
}
