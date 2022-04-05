export interface ITab {
  tabs: readonly ITabType[];
  currentTab: string;
  setCurrentTab: (name: string) => void;
}

export interface ITabType {
  id: number;
  name: string;
}

export interface ITabItem {
  tab: ITabType;
  currentTab: string;
  setCurrentTab: (name: string) => void;
}
