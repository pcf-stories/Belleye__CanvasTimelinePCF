export type IDataItems = {
  isRemoved?: undefined;
  className: string;
  content: string;
  editable: boolean;
  end: string;
  group: string;
  id: string;
  isEdited: boolean;
  isNew: boolean;
  start: string;
  title: string;
  type: string;
}[];
type IDataGroups = {
  id: string;
  content: string;
  nestedGroups?: string[];
  visible?: boolean;
}[];
type IListItems = {
  id: string;
  content: string;
  type: string;
  className: string;
  visClassName: string;
  duration: number;
  target: string;
}[];
