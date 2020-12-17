import Message from "../interfaces/Message";
import commodity from "./commodity"

const functions: {[name: string]: Function} = {
  "https://eddn.edcd.io/schemas/commodity/3": commodity
};

export const dispatch = (entry: {$schemaRef: string, message: Message}) => {
  if (functions[entry.$schemaRef] !== undefined) {
    functions[entry.$schemaRef](entry.message)
  }
}