import { Render } from "../types/render.type";
import { Util } from "../util/Util";
import { WriteAndRemoveListOptions } from "../types/options.type";
import { WordWriter } from "./word.writer";

export class ListWriter extends WordWriter {
  writeList = async (
    render: Render,
    list: string[],
    options?: WriteAndRemoveListOptions
  ): Promise<void> => {
    for (const word of list) {
      await this.writeAndRemoveWord(render, word, options);
      if (options && options.waitWordTime) {
        await Util.sleep(options?.waitWordTime);
      }
    }
  };
}
