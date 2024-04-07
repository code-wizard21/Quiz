import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Drawer, List } from "@mui/material";
import { DashboardNavbarMenuItem } from "./dashboard-navbar-menu-item";
import { Cog as CogIcon } from "../../icons/cog";
import { CustomChartPie as ChartPieIcon } from "../../icons/custom-chart-pie";
import { CustomCube as CubeIcon } from "../../icons/custom-cube";
import { CustomShoppingCart as ShoppingCartIcon } from "../../icons/custom-shopping-cart";
import { CustomUsers as UsersIcon } from "../../icons/custom-users";
import { OfficeBuilding as OfficeBuildingIcon } from "../../icons/office-building";
import { ReceiptTax as ReceiptTaxIcon } from "../../icons/receipt-tax";
import { ColorSwatch as ColorSwatchIcon } from "../../icons/color-swatch";
import { Template as TemplateIcon } from "../../icons/template";
import { DocumentText as DocumentTextIcon } from "../../icons/document-text";

const items = [
  {
    icon: ChartPieIcon,
    title: "Dashboard",
    items: [
      {
        href: "/dashboard/reports",
        title: "Overview",
      },
    ],
  },
  {
    icon: UsersIcon,
    title: "Customers",
    items: [
      {
        href: "/dashboard/customers",
        title: "List",
      },
    ],
  },
];

export const DashboardNavbarMenu = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const [openedItem, setOpenedItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeHref, setActiveHref] = useState("");

  const handleOpenItem = (item) => {
    if (openedItem === item) {
      setOpenedItem(null);
      return;
    }

    setOpenedItem(item);
  };

  useEffect(() => {
    items.forEach((item) => {
      if (item.items) {
        for (let index = 0; index < item.items.length; index++) {
          const active = item.items[index].partialMatch
            ? router.asPath.startsWith(item.items[index].href)
            : router.asPath === item.items[index].href;

          if (active) {
            setActiveItem(item);
            setActiveHref(item.items[index].href);
            setOpenedItem(item);
            break;
          }
        }
      } else {
        const active = item.partialMatch
          ? router.asPath.startsWith(item.href)
          : router.asPath === item.href;

        if (active) {
          setActiveItem(item);
          setOpenedItem(item);
        }
      }
    });
  }, [router.asPath]);

  return (
    <Drawer
      anchor="top"
      onClose={onClose}
      open={open}
      transitionDuration={0}
      ModalProps={{
        BackdropProps: {
          invisible: true,
        },
      }}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.50",
          display: "flex",
          flexDirection: "column",
          top: 64,
          maxHeight: "calc(100% - 64px)",
          width: "100vw",
        },
      }}
    >
      <List>
        {activeItem &&
          items.map((item) => (
            <DashboardNavbarMenuItem
              active={activeItem?.title === item.title}
              activeHref={activeHref}
              key={item.title}
              onClose={onClose}
              onOpenItem={() => handleOpenItem(item)}
              open={openedItem?.title === item.title}
              {...item}
            />
          ))}
      </List>
    </Drawer>
  );
};

DashboardNavbarMenu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
