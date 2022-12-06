import { Render } from "../types/render.type";
import { Util } from "../util/Util";
import { WordWriter } from "./word.writer";
import { WriteAndRemoveListOptions } from "../types/options.type";

export class ListWriter extends WordWriter {
  private list: string[] = [];
  constructor(prod: boolean = true) {
    super(prod);
  }

  private defaultOptions: WriteAndRemoveListOptions = {
    writerSpeed: 90,
    removeSpeed: 70,
    waitWordTime: 400,
    waitProcessTime: 500,
    infinite: true,
    waitProcessEndTime: 0,
  };

  writeList = async (
    render: Render,
    list: string[],
    options: WriteAndRemoveListOptions
  ): Promise<void> => {
    this.list = list;
    const opts = this.getOptions(options);
    if (!this.validateList()) return;
    if (opts.infinite) {
      this.writeListInfinite(render, opts);
      return;
    }
    this.writeListSingle(render, opts);
  };

  setList = (list: string[]): void => {
    this.list = list;
  };

  private writeListSingle = async (
    render: Render,
    options?: WriteAndRemoveListOptions
  ): Promise<void> => {
    for (const word of this.list) {
      await this.writeAndRemoveWordSingle(render, word, options);
      if (options && options.waitWordTime) {
        await Util.sleep(options?.waitWordTime);
      }
    }
  };

  private writeListInfinite = (
    render: Render,
    options?: WriteAndRemoveListOptions
  ): void => {
    const writer = async () => {
      await this.writeListSingle(render, options);
    };
    this.infiniteLoop(writer);
  };

  private validateList = (): boolean => {
    if (!this.list || this.list.length === 0) {
      if (!this.isProduction) {
        console.warn("Your list is empty! Please check your list.");
      }
      return false;
    }
    return true;
  };

  private getOptions = (
    options: WriteAndRemoveListOptions
  ): WriteAndRemoveListOptions => {
    if (!options) return this.defaultOptions;
    return {
      ...this.defaultOptions,
      ...options,
    };
  };
}
