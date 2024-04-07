import { Button, Card, CardHeader, Divider, useMediaQuery } from "@mui/material";
import { PropertyList } from "../../property-list";
import { PropertyListItem } from "../../property-list-item";

export const OrganizationBillingInfo = () => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const align = mdDown ? "vertical" : "horizontal";

  return (
    <Card>
      <CardHeader
        action={
          <Button color="primary"
size="small"
variant="text">
            Edit
          </Button>
        }
        title="Billing Information"
      />
      <Divider />
      <PropertyList>
        <PropertyListItem align={align}
divider
label="Name/Company"
value="Acme INC" />
        <PropertyListItem align={align}
divider
label="Country"
value="Germany" />
        <PropertyListItem align={align}
divider
label="Zip Code"
value="6753454" />
        <PropertyListItem align={align}
label="City"
value="Berlin" />
      </PropertyList>
    </Card>
  );
};
