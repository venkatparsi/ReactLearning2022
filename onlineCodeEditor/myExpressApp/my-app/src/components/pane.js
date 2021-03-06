import classNames from "classnames";

import styles from "./pane.module.css";


export const Pane = ({ children, expanded, title }) => {
  return (
    <div className={styles.pane}>
      <div className={styles.paneHeader}>
        <div
          className={classNames(
            "codicon",
            expanded ? "codicon-chevron-down" : "codicon-chevron-up"
          )}
        ></div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      {expanded && <div className={styles.paneBody}>{children}</div>}
    </div>
  );
};
