/*
   Copyright 2023 Betim Beja and Shko Online LLC

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import type { Meta, StoryObj } from "@storybook/html";
import type {
  IInputs,
  IOutputs,
} from "../timelinecontrol/generated/ManifestTypes";

import { useArgs, useEffect } from "@storybook/preview-api";

import {
  ComponentFrameworkMockGenerator,
  DateTimePropertyMock,
  StringPropertyMock,
  TwoOptionsPropertyMock,
} from "@shko.online/componentframework-mock";

import { timelinecontrol as Component } from "../timelinecontrol/index";

import "../timelinecontrol/css/timelinecontrol.css";
import { DataItems, DataGroups, ListItems } from "./data";
interface StoryArgs {
  isVisible: boolean;
  isDisabled: boolean;
  dataitems: typeof DataItems;
  dataGroups: typeof DataGroups;
  reloadTimeline: string;
  reloadData: string;
  editMode: boolean;
  customCss: string;

  optionStart: Date;
  optionEnd: Date;
  optionStack: boolean;
  optionStackSubgroups: boolean;
  optionVerticalScroll: boolean;
  optionHorizontalScroll: boolean;
  listItems: typeof ListItems;
  listCSS: string;
}

import "../node_modules/vis-timeline/dist/vis-timeline-graph2d.min.css";
import * as customCss from "../../data/Demo1/item.css";
import * as listcss from "../../data/Demo1/list.css";
export default {
  title: "CanvasTimelinePCF/CanvasTimeline",
  argTypes: {
    dataitems: {
      control: "array",
      name: "Items",
      table: {
        category: "Parameters",
      },
    },
    dataGroups: {
      control: "array",
      name: "Groups",
      table: {
        category: "Parameters",
      },
    },
    listItems: {
      control: "array",
      name: "ListItems",
      table: {
        category: "Parameters",
      },
    },
    optionStart: {
      control: "date",
      name: "Start",
      table: {
        category: "Parameters",
      },
    },
    optionEnd: {
      control: "date",
      name: "End",
      table: {
        category: "Parameters",
      },
    },
    optionStackSubgroups: {
      control: "boolean",
      name: "Stack Subgroups",
      table: {
        category: "Parameters",
      },
    },
    optionStack: {
      control: "boolean",
      name: "Stack",
      table: {
        category: "Parameters",
      },
    },
    editMode: {
      control: "boolean",
      name: "Edit Mode",
      table: {
        category: "Parameters",
      },
    },
    optionHorizontalScroll: {
      control: "boolean",
      name: "Horizontal Scroll",
      table: {
        category: "Parameters",
      },
    },
    isDisabled: {
      control: "boolean",
      name: "Disabled",
      table: {
        category: "Mode",
      },
    },
    isVisible: {
      control: "boolean",
      name: "Visible",
      table: {
        category: "Mode",
      },
    },
  },
  args: {
    isDisabled: false,
    isVisible: true,
    dataitems: DataItems,
    dataGroups: DataGroups,
    listItems: ListItems,
    optionStart: new Date("2024-03-17"),
    optionEnd: new Date("2024-03-19"),
    optionStack: true,
    optionStackSubgroups: true,
    editMode: true,
    optionHorizontalScroll: true,
  },
} as Meta<StoryArgs>;

const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;
  return function () {
    const [args, updateArgs] = useArgs<StoryArgs>();
    useEffect(
      () => () => {
        container = null;
        mockGenerator.control.destroy();
      },
      []
    );
    if (!container) {
      container = document.createElement("div");
      mockGenerator = new ComponentFrameworkMockGenerator(
        Component,
        {
          dataitems: StringPropertyMock,
          reloadTimeline: StringPropertyMock,
          reloadData: StringPropertyMock,
          editMode: TwoOptionsPropertyMock,
          customCss: StringPropertyMock,
          datagroups: StringPropertyMock,
          optionStart: DateTimePropertyMock,
          optionEnd: DateTimePropertyMock,
          optionStack: TwoOptionsPropertyMock,
          optionStackSubgroups: TwoOptionsPropertyMock,
          optionVerticalScroll: TwoOptionsPropertyMock,
          optionHorizontalScroll: TwoOptionsPropertyMock,
          listItems: StringPropertyMock,
          listCSS: StringPropertyMock,
        },
        container,
        {
          customCss: "string",
          datagroups: "string",
          dataitems: "string",
          selectedItem: "string",
          timelineEnd: "Date",
          timelineJSON: "string",
          reloadData: "string",
          listItems: "string",
          reloadTimeline: "string",
          removedJSON: "string",
          selectedModifer: "string",
          timelineStart: "Date",
        }
      );

      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context.mode.isVisible = args.isVisible;

      mockGenerator.context._SetCanvasItems({
        dataitems: JSON.stringify(args.dataitems),
        datagroups: JSON.stringify(args.dataGroups),
        listItems: JSON.stringify(args.listItems),
        optionStart:
          typeof args.optionStart == "number"
            ? new Date(args.optionStart)
            : args.optionStart,
        optionEnd:
          typeof args.optionEnd == "number"
            ? new Date(args.optionEnd)
            : args.optionEnd,
        optionStack: args.optionStack,
        optionStackSubgroups: args.optionStackSubgroups,
        listCSS: listcss,
        customCss: customCss,
        editMode: args.editMode,
        optionHorizontalScroll: args.optionHorizontalScroll,

        // listItems:JSON.stringify(args.dataitems)
      });

      mockGenerator.onOutputChanged.callsFake(({ ...p }) => {
        // console.log(args.dataitems.find((item) => item.id == selectedItem));
        console.log("remove", p);
        // mockGenerator.context._parameters.dataitems._Refresh();
        if (p.timelineJSON) {
          updateArgs({
            dataitems: JSON.parse(p.timelineJSON),
          });
        }
        // console.log(JSON.parse(p.timelineJSON));
        // if (removedJSON) {
        //   // console.log("remove");
        //   updateArgs({
        //     dataitems: args.dataitems.filter(
        //       (item) => !JSON.parse(removedJSON).includes(item.id)
        //     ),
        //   });
        // }
      });

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      //   mockGenerator.context._parameters.src._SetValue(args.src);

      console.log(args.editMode);

      mockGenerator.context._SetCanvasItems({
        // src: args.src,
        // dataitems: JSON.stringify(args.dataitems),
        // datagroups: JSON.stringify(args.dataGroups),
        // listItems: JSON.stringify(args.listItems),
        optionStart:
          typeof args.optionStart == "number"
            ? new Date(args.optionStart)
            : args.optionStart,
        optionEnd:
          typeof args.optionEnd == "number"
            ? new Date(args.optionEnd)
            : args.optionEnd,
        optionStack: args.optionStack,
        optionStackSubgroups: args.optionStackSubgroups,
        editMode: args.editMode,
        optionHorizontalScroll: args.optionHorizontalScroll,
        // listItems:JSON.stringify(args.dataitems)
      });
      mockGenerator.ExecuteUpdateView();
    }

    return container;
  };
};

export const CanvasTimeline = {
  render: renderGenerator(),
  parameters: { controls: { expanded: false } },
} as StoryObj<StoryArgs>;
