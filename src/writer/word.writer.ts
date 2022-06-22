import type { Render } from "../types/render.type";
import { Util } from "../util/Util";
import { BaseWriter } from "./base.writer";
import type {
  WriteWordOptions,
  RemoveWordOptions,
  WriteAndRemoveWordOptions,
} from "../types/options.type";

export class WordWriter extends BaseWriter {
  protected isProduction: boolean;
  constructor(prod: boolean = true) {
    super();
    this.isProduction = prod;
  }

  private process: boolean = true;
  private lastFunc?: Function;

  writeWord = async (
    render: Render,
    word: string,
    options?: WriteWordOptions
  ): Promise<void> => {
    if (!this.validateWord(word)) return;
    for (const char of this.type(word)) {
      await this.print(render, char, options?.writerSpeed || 60);
    }
  };

  removeWord = async (
    render: Render,
    word: string,
    options?: RemoveWordOptions
  ): Promise<void> => {
    for (const char of this.dele(word)) {
      await this.print(render, char, options?.removeSpeed || 30);
    }
  };

  writeAndRemoveWord = async (
    render: Render,
    word: string,
    options?: WriteAndRemoveWordOptions
  ): Promise<void> => {
    if (options && options.infinite) {
      this.writeAndRemoveWordInfinite(render, word, options);
      return;
    }
    this.writeAndRemoveWordSingle(render, word, options);
  };

  protected writeAndRemoveWordSingle = async (
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

  private writeAndRemoveWordInfinite = (
    render: Render,
    word: string,
    options?: WriteAndRemoveWordOptions
  ): void => {
    const writer = async () => {
      this.writeAndRemoveWordSingle(render, word, options);
    };
    this.infiniteLoop(writer);
  };

  stop = (): void => {
    this.process = false;
  };

  start = (): void => {
    this.process = true;
    if (this.lastFunc) {
      this.infiniteLoop(this.lastFunc);
    }
  };

  protected infiniteLoop = (func: Function): void => {
    this.lastFunc = func;
    const loop = async () => {
      await func();
      if (this.process) {
        loop();
      }
    };
    loop();
  };

  private validateWord = (word: string): boolean => {
    if (!word || word.length === 0) {
      if (!this.isProduction) {
        console.warn("Your word is empty! Please check your word.");
      }
      return false;
    }
    return true;
  };
}
