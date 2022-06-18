import { Render } from "../types/render.type";
import { Util } from "../util/Util";

export class BaseWriter {
  *type(str: string): Generator<string, string, unknown> {
    let index: number = 0;
    while (index < str.length) {
      yield str.slice(0, ++index);
    }
    return str;
  }

  *dele(str: string): Generator<string, string, unknown> {
    let index: number = str.length;
    while (index > 0) {
      yield str.slice(0, --index);
    }
    return str;
  }

  print = (render: Render, text: string, timeout: number): Promise<void> => {
    render(text);
    return Util.sleep(timeout);
  };
}
