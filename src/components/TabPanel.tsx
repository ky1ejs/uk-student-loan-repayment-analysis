import React from "react";

const TabPanel = ({
  currentTab,
  index,
  children,
}: {
  currentTab: number;
  index: number;
  children: React.ReactNode;
}) => {
  return (
    <div
      hidden={currentTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {currentTab === index && <>{children}</>}
    </div>
  );
};

export default TabPanel;
