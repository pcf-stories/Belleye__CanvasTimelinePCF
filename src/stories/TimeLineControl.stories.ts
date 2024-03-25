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

interface StoryArgs {
  isVisible: boolean;
  isDisabled: boolean;
  dataitems: typeof DataItems;
  dataGroups: typeof DataGroups;
  reloadTimeline: string;
  reloadData: string;
  editMode: boolean;
  customCss: string;
  datagroups: string;

  optionStart: Date;
  optionEnd: Date;
  optionStack: boolean;
  optionStackSubgroups: boolean;
  optionVerticalScroll: boolean;
  optionHorizontalScroll: boolean;
  listItems: string;
  listCSS: string;
}

import { DataItems, DataGroups } from "./data";

import "../../data/Demo1/item.css";
export default {
  title: "TimeLineControl/TimeLineControl",
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
    optionStart: {
      control: "date",
      name: "optionStart",
      table: {
        category: "Parameters",
      },
    },
    optionEnd: {
      control: "date",
      name: "optionEnd",
      table: {
        category: "Parameters",
      },
    },
    optionStackSubgroups: {
      control: "boolean",
      name: "optionStackSubgroups",
      table: {
        category: "Parameters",
      },
    },
    optionStack: {
      control: "boolean",
      name: "optionStack",
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
    optionStart: new Date(),
    optionEnd: new Date("2025-10-29"),
    optionStack: false,
    optionStackSubgroups: false,
  },
  decorators: [
    (Story) => {
      var container = document.createElement("div");
      container.style.margin = "2em";
      container.style.padding = "1em";
      container.style.maxWidth = "350px";
      container.style.border = "dotted 1px";

      var storyResult = Story();
      if (typeof storyResult == "string") {
        container.innerHTML = storyResult;
      } else {
        container.appendChild(storyResult);
      }
      return container;
    },
  ],
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
        container
      );

      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context._SetCanvasItems({
        // src: args.src,
        dataitems: JSON.stringify(args.dataitems),
        datagroups: JSON.stringify(args.dataGroups),
        optionStart: args.optionStart,
        optionEnd: args.optionEnd,
        optionStack: args.optionStack,
        optionStackSubgroups: args.optionStackSubgroups,
        // listItems:JSON.stringify(args.dataitems)
      });

      mockGenerator.onOutputChanged.callsFake(() => {
        // mockGenerator.context._parameters.dataitems._Refresh();
        updateArgs({
          //   src: mockGenerator.context._parameters.src.raw || undefined,
        });
      });

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      //   mockGenerator.context._parameters.src._SetValue(args.src);
      mockGenerator.ExecuteUpdateView();
    }

    return container;
  };
};

export const TimeLineControl = {
  render: renderGenerator(),
  parameters: { controls: { expanded: true } },
} as StoryObj<StoryArgs>;
