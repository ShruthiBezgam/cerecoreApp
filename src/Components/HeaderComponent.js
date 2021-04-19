import { AppBar, Toolbar, Button, makeStyles} from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";

const headersData = [
    {
      label: "COVID",
      href: "/listings",
    },
    {
      label: "All videos",
      href: "/mentors",
    }    
  ];

  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "rgba(5, 22, 51,0.8)",
    }    
  }));

export default function Header() {

  const { header } = useStyles();
    
  const displayDesktop1 = () => {
    return (
      <Toolbar>        
        {getMenuButtons()}
      </Toolbar>
    );
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: Link,
          }}
        >
          {label}
        </Button>
      );
    });
  };
  
  return (
    <header>
      <AppBar className={header}>{displayDesktop1()}</AppBar>
    </header>
  );
}