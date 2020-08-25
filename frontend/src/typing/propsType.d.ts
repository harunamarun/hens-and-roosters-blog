import { IGif } from "@giphy/js-types";
import { ParsedQuery } from "query-string";
import { Dispatch, SetStateAction } from "react";

export type centerPropsType = {
  query: ParsedQuery<string>;
};

export type userIconProps = {
  username: string;
};

export type giphyPropsType = {
  setGifURL: Dispatch<SetStateAction<string>>;
  setPreviewImage: Dispatch<SetStateAction<string>>;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type gifsGridProps = {
  onGifClick: (gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => void;
};

export type searchPropsType = {
  modalIsOpen?: boolean;
  setModalIsOpen?: Dispatch<SetStateAction<boolean>>;
};
