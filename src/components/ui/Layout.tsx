/** Main container for every screen in app */
// eslint-disable-next-line import/no-unresolved
import CSS from "csstype";
import { ReactElement, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import Colors from "../styling/Colors";
import Header from "./Header";

const Layout = ({
  noHeader = false,
  children,
  title,
  style,
  headerStyle,
  className,
  flexColumn = false,
  parent,
  hideBackButton = false,
  onChangeToOffline,
}: {
  noHeader?: boolean;
  children?: ReactNode;
  title?: string;
  style?: CSS.Properties;
  headerStyle?: CSS.Properties;
  className?: string;
  flexColumn?: boolean;
  parent?: string;
  hideBackButton?: boolean;
  onChangeToOffline?: Function;
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
          onChangeToOffline={onChangeToOffline}
          hideBackButton={hideBackButton}
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
