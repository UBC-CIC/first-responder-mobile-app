import { ReactElement, ReactNode } from "react";
import Header from "./Header";
import { SwipeEventData, useSwipeable } from "react-swipeable";
import { useHistory } from "react-router-dom";
import Colors from "./Colors";
const Layout = ({
  noHeader = false,
  children,
  title,
}: {
  noHeader?: boolean;
  children?: ReactNode;
  title?: string;
}): ReactElement => {
  const history = useHistory();
  const handleSwipeRight = (eventData: SwipeEventData) => {
    if (eventData.initial[0] <= 25) {
      if (history.location.pathname !== "/") history.goBack();
    }
  };
  const handlers = useSwipeable({
    onSwipedRight: handleSwipeRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
  });
  return (
    <div
      {...handlers}
      style={{
        minHeight: "100vh",
        // backgroundColor: Colors.theme.onyx
      }}
    >
      {!noHeader && <Header title={title || history.location.pathname} />}
      {children}
    </div>
  );
};

export default Layout;
