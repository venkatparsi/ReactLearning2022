import "@vscode/codicons/dist/codicon.css";
import styles from "./advanced.stories.module.css";
import { useState } from "react";
import { Allotment } from "allotment";//
//import { LayoutPriority } from "../src/split-view";

import { ActivityBar } from "./activity-bar";
import { AuxiliaryBar } from "./auxiliary-bar";
import { Editor } from "./editor";
import { Panel } from "./panel";
import { Sidebar } from "./sidebar";

const ACTIVITIES = [
  "Explorer",
  "Search",
  "Source Control",
  "Run and Debug",
  "Extensions",
];

const DOCUMENTS = [
  { title: "allotment.tsx", icon: "ts" },
  { title: "allotment.module.css", icon: "css" },
];

 export const VisualStudioCode = ({
  activityBar,
  primarySideBar,
  primarySideBarPosition = 'left',
  secondarySideBar,
}) => {
  const [editorVisible, setEditorVisible] = useState(true);
  const [panelVisible, setPanelVisible] = useState(true);
  const [activity, setActivity] = useState(0);
  const [openEditors, setOpenEditors] = useState(DOCUMENTS);

  const sidebar = (
    <Allotment.Pane
      key="sidebar"
      minSize={170}      
      preferredSize={300}
      visible={primarySideBar}
      snap
    >
      <Sidebar
        title={ACTIVITIES[activity]}
        documents={DOCUMENTS}
        openEditors={openEditors}
        onOpenEditorsChange={(openEditor) => {
          setOpenEditors(openEditor);
        }}
      />
    </Allotment.Pane>
  );

  const auxiliarySidebar = (
    <Allotment.Pane
      key="auxiliarySidebar"
      minSize={170}     
      preferredSize={300}
      visible={secondarySideBar}
      snap
    >
      <AuxiliaryBar />
    </Allotment.Pane>
  );

  return (
    <div className={styles.container}>
      <Allotment proportionalLayout={false}>
        <Allotment.Pane
          key="activityBar"
          minSize={48}
          maxSize={48}
          visible={activityBar}
        >
          <ActivityBar
            checked={activity}
            items={[
              "files",
              "search",
              "source-control",
              "debug-alt",
              "extensions",
            ]}
            onClick={(index) => {
              setActivity(index);
            }}
          />
        </Allotment.Pane>
        {primarySideBarPosition === "left" ? sidebar : auxiliarySidebar}
        <Allotment.Pane
          key="content"
          minSize={300}
          
        >
          <Allotment
            vertical
            snap
            onVisibleChange={(index, value) => {
              if (index === 0) {
                setEditorVisible(value);
              } else if (index === 1) {
                setPanelVisible(value);
              }
            }}
          >
            <Allotment.Pane key="editor" minSize={70} visible={editorVisible}>
              <Editor
                documents={openEditors}
                onDocumentsChange={(documents) => {
                  setOpenEditors(documents);
                }}
              />
            </Allotment.Pane>
            <Allotment.Pane
              key="terminal"
              minSize={78}
              preferredSize="40%"
              visible={panelVisible}
            >
              <Panel
                maximized={!editorVisible}
                onClose={() => {
                  setEditorVisible(true);
                  setPanelVisible(false);
                }}
                onMaximize={() => {
                  setEditorVisible(false);
                  setPanelVisible(true);
                }}
                onMinimize={() => {
                  setEditorVisible(true);
                  setPanelVisible(true);
                }}
              />
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
        {primarySideBarPosition === "right" ? sidebar : auxiliarySidebar}
      </Allotment>
    </div>
  );
};

VisualStudioCode.args = {
  activityBar: true,
  primarySideBar: true,
  primarySideBarPosition: "left",
  secondarySideBar: true,
};

export default  VisualStudioCode;