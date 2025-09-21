// TODO: add decorator that applies a limit to the BUY endpoint
export interface RateLimiterProps {
  itemId: string;
  ammount: number;
}

export const RateLimiter = (callback: Function) => {
  console.log("callback!!");
  callback();
};
