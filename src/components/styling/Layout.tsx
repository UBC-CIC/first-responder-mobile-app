import { ReactElement, ReactNode } from "react";
import CSS from "csstype";
import Header from "./Header";
import { SwipeEventData, useSwipeable } from "react-swipeable";
import { useHistory } from "react-router-dom";
import Colors from "./Colors";
const Layout = ({
  noHeader = false,
  children,
  title,
  style,
  headerStyle,
  className,
  flexColumn = false,
  parent,
  headerOfflineClickable = true,
}: {
  noHeader?: boolean;
  children?: ReactNode;
  title?: string;
  style?: CSS.Properties;
  headerStyle?: CSS.Properties;
  className?: string;
  flexColumn?: boolean;
  parent?: string;
  headerOfflineClickable?: boolean;
}): ReactElement => {
  const history = useHistory();
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: Colors.theme.onyx,
        display: flexColumn ? "flex" : undefined,
        flexDirection: flexColumn ? "column" : undefined,
        ...style,
      }}
      className={className}
    >
      {!noHeader && (
        <Header
          parent={parent}
          style={headerStyle}
          title={title || history.location.pathname}
        />
      )}
      {children}
    </div>
  );
};

export default Layout;
