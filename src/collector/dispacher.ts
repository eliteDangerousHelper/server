import Message from "../interfaces/Message";
import commodity from "./commodity"
import journal from "./journal";

const functions: {[name: string]: Function} = {
  "https://eddn.edcd.io/schemas/commodity/3": commodity,
  "https://eddn.edcd.io/schemas/journal/1": journal
};

export const dispatch = (entry: {$schemaRef: string, message: Message}) => {
  if (functions[entry.$schemaRef] !== undefined) {
    functions[entry.$schemaRef](entry.message)
  }
}