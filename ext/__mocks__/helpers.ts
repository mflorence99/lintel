type Callback = (...args: any) => any | Promise<any>;

// ///////////////////////////////////////////////////////////////////

globalThis.LINTEL_COMMAND_HANDLERS = {} as Record<string, Callback>;

export const handleCommand = (command: string): Callback => {
  return globalThis.LINTEL_COMMAND_HANDLERS[command];
};

export const commandHandler = (command: string, cb: Callback): void => {
  globalThis.LINTEL_COMMAND_HANDLERS[command] = cb;
};

// ///////////////////////////////////////////////////////////////////

globalThis.LINTEL_MESSAGE_HANDLER = null as Callback;

export const handleMessage = (message: any): any => {
  return globalThis.LINTEL_MESSAGE_HANDLER(message);
};

export const messageHandler = (cb: Callback): void => {
  globalThis.LINTEL_MESSAGE_HANDLER = cb;
};
