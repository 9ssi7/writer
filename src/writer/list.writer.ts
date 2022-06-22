import { Render } from "../types/render.type";
import { Util } from "../util/Util";
import { WriteAndRemoveListOptions } from "../types/options.type";
import { WordWriter } from "./word.writer";

export class ListWriter extends WordWriter {
  constructor(prod: boolean = true) {
    super(prod);
  }

  private defaultOptions: WriteAndRemoveListOptions = {
    writerSpeed: 60,
    removeSpeed: 30,
    waitWordTime: 300,
    waitProcessTime: 500,
    infinite: true,
    waitProcessEndTime: 0,
  };

  writeList = async (
    render: Render,
    list: string[],
    options: WriteAndRemoveListOptions
  ): Promise<void> => {
    const opts = this.getOptions(options);
    if (!this.validateList(list)) return;
    if (opts.infinite) {
      this.writeListInfinite(render, list, opts);
      return;
    }
    this.writeListSingle(render, list, opts);
  };

  private writeListSingle = async (
    render: Render,
    list: string[],
    options?: WriteAndRemoveListOptions
  ): Promise<void> => {
    for (const word of list) {
      await this.writeAndRemoveWordSingle(render, word, options);
      if (options && options.waitWordTime) {
        await Util.sleep(options?.waitWordTime);
      }
    }
  };

  private writeListInfinite = (
    render: Render,
    list: string[],
    options?: WriteAndRemoveListOptions
  ): void => {
    const writer = async () => {
      await this.writeListSingle(render, list, options);
    };
    this.infiniteLoop(writer);
  };

  private validateList = (list: string[]): boolean => {
    if (!list || list.length === 0) {
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
