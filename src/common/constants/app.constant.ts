
export const COMMON_CONSTANTS = {
  REGEX_BASE64:
    /^([\d+/A-Za-z]{4})*([\d+/A-Za-z]{4}|[\d+/A-Za-z]{3}=|[\d+/A-Za-z]{2}==)$/,
};

export enum OrderType {
  BUY = 'Buy',
  SELL = 'Sell',
}

export enum CollectionType {
  DRAFT = 1,
  PUBLISH = 2,
}