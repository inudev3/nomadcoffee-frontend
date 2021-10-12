import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
};

export default function PageTitle({ title }: Props) {
  return (
    <Helmet>
      <title>{title} | NomadCoffee</title>
    </Helmet>
  );
}
