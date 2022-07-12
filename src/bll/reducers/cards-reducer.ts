import { AxiosError } from "axios";
import { AppRootStateType, AppThunk } from "../store";
import { appSetStatusAC } from "./app-reducer";
import { handleNetworkError } from "../../utils/errorUtils";
import { CardsResponseType, CardType, getCardsAPI } from "../../api/cards-api";

//loadind => preloader visible
// 'idle' | 'succeeded' | 'failed' => preloader unvisible

const initialState = {
  cards: [
    {
      _id: "",
      cardsPack_id: "",
      user_id: "",
      answer: "",
      question: "",
      grade: 0,
      shots: 0,
      comments: "",
      type: "",
      rating: 0,
      more_id: "",
      created: "",
      updated: "",
      __v: 0,
    },
  ],
  page: 1,
  pageCount: 5,
  cardsTotalCount: 0,
};

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "CARDS/get-one-page-cards": {
      return {
        ...state,
        cards: action.data.cards,
        cardsTotalCount: action.data.cardsTotalCount,
      };
    }

    case "CARDS/set-cards-page": {
      return {
        ...state,
        page: action.page,
      };
    }

    case "CARDS/set-cards-countPage": {
      return {
        ...state,
        pageCount: action.pageCount,
      };
    }

    default:
      return state;
  }
};

// ==== ACTIONS =====

export const getCardsAC = (data: CardsResponseType) =>
  ({ type: "CARDS/get-one-page-cards", data } as const);

export const setCardsPageAC = (page: number) =>
  ({ type: "CARDS/set-cards-page", page } as const);

export const setCardsPageCountAC = (pageCount: number) =>
  ({ type: "CARDS/set-cards-countPage", pageCount } as const);

// ==== THUNKS =====

export const getCardsListTC =
  (cardsPackID: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getCardsAPI.getCardsList(cardsPackID);
      dispatch(getCardsAC(response.data));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const getSortCardsListTC =
  (
    page: number,
    pageCount: number,
    packID: string,
    sortUpdate: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getCardsAPI.getSortCardsList(
        page,
        pageCount,
        packID,
        sortUpdate
      );

      dispatch(getCardsAC(response.data));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const addCardTC =
  (
    page: number,
    pageCount: number,
    question: string,
    answer: string,
    cardsPack_id: string,
    cardsCount: number
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getCardsAPI.addCard(
        question,
        answer,
        cardsPack_id
      );

      dispatch(getCardsListTC(cardsPack_id));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const deleteCardTC =
  (
    page: number,
    pageCount: number,
    // cardsPackID: string,
    cardID: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getCardsAPI.deleteCard(cardID);

      dispatch(getCardsListTC(cardID));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

export const updateCardTC =
  (
    page: number,
    pageCount: number,
    cardsPackID: string,
    cardID: string,
    newQuestion: string,
    newAnswer: string,
    cardsCount: number
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(appSetStatusAC("loading"));
      const response = await getCardsAPI.updateCard(
        cardID,
        newQuestion,
        newAnswer
      );

      dispatch(getCardsListTC(cardsPackID));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleNetworkError(dispatch, err);
    } finally {
      dispatch(appSetStatusAC("idle"));
    }
  };

// ==== SELECTORS ====

export const cardsSelect = (state: AppRootStateType) => state.cards.cards;
export const totalCardsCountSelect = (state: AppRootStateType) =>
  state.cards.cardsTotalCount;
export const cardsPageSelect = (state: AppRootStateType) => state.cards.page;
export const cardsPageCountSelect = (state: AppRootStateType) =>
  state.cards.pageCount;

// ==== TYPES ====
export type InitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type CardListType = Array<CardType> & {
  cardsTotalCount: number;
};

export type GetCardsType = ReturnType<typeof getCardsAC>;
export type SetCardsPageType = ReturnType<typeof setCardsPageAC>;
export type SetCardsPageCountType = ReturnType<typeof setCardsPageCountAC>;

export type CardsActionsTypes =
  | GetCardsType
  | SetCardsPageType
  | SetCardsPageCountType;
