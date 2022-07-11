import "@vscode/codicons/dist/codicon.css";
import styles from "./Activity-bar.module.css";
import classNames from "classnames";
import React from "react";

export const ActivityBar = ({ checked, items, onClick }) => {
  return (
    <div className={styles.activitybar}>
      <div className={styles.content}>
        <ul className={styles.actionsContainer}>
          {items.map((item, index) => (
            <li
              key={index}
              className={classNames(styles.actionItem, {
                [styles.checked]: index === checked,
              })}
            >
              <a
                className={classNames(
                  `codicon codicon-${item}`,
                  styles.actionLabel
                )}
                onClick={() => {
                  onClick(index);
                }}
              ></a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
