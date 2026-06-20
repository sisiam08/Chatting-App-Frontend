import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type RouteItems = {
  id: string;
  title: string;
  url: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  filled?: boolean;
  isActive?: boolean;
};

export type ActionItems = {
  id: string;
  title: string;
  url?: string;
  type?: string;
  label?: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  danger?: boolean;
};

export type Routes = {
  navItems: RouteItems[];
  bottomActions: ActionItems[];
};
