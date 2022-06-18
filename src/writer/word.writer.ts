import type { Render } from "../types/render.type";
import { Util } from "../util/Util";
import { BaseWriter } from "./base.writer";
import type {
  WriteWordOptions,
  RemoveWordOptions,
  WriteAndRemoveWordOptions,
} from "../types/options.type";

export class WordWriter extends BaseWriter {
  writeWord = async (
    render: Render,
    word: string,
    options?: WriteWordOptions
  ): Promise<void> => {
    for (const char of this.type(word)) {
      await this.print(render, char, options?.writerSpeed || 250);
    }
  };

  removeWord = async (
    render: Render,
    word: string,
    options?: RemoveWordOptions
  ): Promise<void> => {
    for (const char of this.dele(word)) {
      await this.print(render, char, options?.removeSpeed || 250);
    }
  };

  writeAndRemoveWord = async (
    render: Render,
    word: string,
    options?: WriteAndRemoveWordOptions
  ): Promise<void> => {
    await this.writeWord(render, word, options);
    if (options && options.waitProcessTime) {
      await Util.sleep(options?.waitProcessTime);
    }
    await this.removeWord(render, word, options);
    if (options && options.waitProcessEndTime) {
      await Util.sleep(options?.waitProcessEndTime);
    }
  };
}
