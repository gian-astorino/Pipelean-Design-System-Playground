import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
  Attachment01Icon,
  BoldIcon,
  Cancel01Icon,
  CheckIcon,
  ChevronDownIcon as HugeChevronDownIcon,
  ChevronLeftIcon as HugeChevronLeftIcon,
  ChevronRightIcon as HugeChevronRightIcon,
  ChevronUpIcon as HugeChevronUpIcon,
  CircleCheckIcon,
  CircleIcon as HugeCircleIcon,
  File01Icon,
  GripVerticalIcon as HugeGripVerticalIcon,
  InboxIcon as HugeInboxIcon,
  InformationCircleIcon,
  ItalicIcon,
  LoaderCircleIcon,
  Moon02Icon,
  MoreHorizontalIcon as HugeMoreHorizontalIcon,
  OctagonXIcon as HugeOctagonXIcon,
  PaletteIcon as HugePaletteIcon,
  PanelLeftIcon as HugePanelLeftIcon,
  PlusSignIcon,
  MinusSignIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowDown01Icon,
  Search01Icon,
  Sun03Icon,
  TriangleAlertIcon as HugeTriangleAlertIcon,
  UnderlineIcon,
} from "@hugeicons/core-free-icons"

type IconProps = React.SVGProps<SVGSVGElement>

function makeIcon(icon: IconSvgElement, displayName: string) {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ strokeWidth, ...props }, ref) => (
      <HugeiconsIcon
        ref={ref}
        icon={icon}
        strokeWidth={strokeWidth !== undefined ? Number(strokeWidth) : undefined}
        {...props}
      />
    )
  )
  Icon.displayName = displayName
  return Icon
}

const ChevronRight = makeIcon(HugeChevronRightIcon, "ChevronRight")
const MoreHorizontal = makeIcon(HugeMoreHorizontalIcon, "MoreHorizontal")
const ChevronDownIcon = makeIcon(HugeChevronDownIcon, "ChevronDownIcon")
const Loader2Icon = makeIcon(LoaderCircleIcon, "Loader2Icon")
const PanelLeftIcon = makeIcon(HugePanelLeftIcon, "PanelLeftIcon")
const ArrowLeft = makeIcon(ArrowLeft01Icon, "ArrowLeft")
const ArrowRight = makeIcon(ArrowRight01Icon, "ArrowRight")
const CheckIconExport = makeIcon(CheckIcon, "CheckIcon")
const ChevronRightIcon = makeIcon(HugeChevronRightIcon, "ChevronRightIcon")
const CircleIcon = makeIcon(HugeCircleIcon, "CircleIcon")
const XIcon = makeIcon(Cancel01Icon, "XIcon")
const MinusIcon = makeIcon(MinusSignIcon, "MinusIcon")
const ArrowDownIcon = makeIcon(ArrowDown01Icon, "ArrowDownIcon")
const SearchIcon = makeIcon(Search01Icon, "SearchIcon")
const GripVerticalIcon = makeIcon(HugeGripVerticalIcon, "GripVerticalIcon")
const ChevronUpIcon = makeIcon(HugeChevronUpIcon, "ChevronUpIcon")
const Moon = makeIcon(Moon02Icon, "Moon")
const Sun = makeIcon(Sun03Icon, "Sun")
const Palette = makeIcon(HugePaletteIcon, "Palette")
const Bold = makeIcon(BoldIcon, "Bold")
const Italic = makeIcon(ItalicIcon, "Italic")
const UnderlineExport = makeIcon(UnderlineIcon, "Underline")
const Info = makeIcon(InformationCircleIcon, "Info")
const InfoIcon = makeIcon(InformationCircleIcon, "InfoIcon")
const TriangleAlert = makeIcon(HugeTriangleAlertIcon, "TriangleAlert")
const TriangleAlertIcon = makeIcon(HugeTriangleAlertIcon, "TriangleAlertIcon")
const Paperclip = makeIcon(Attachment01Icon, "Paperclip")
const FileText = makeIcon(File01Icon, "FileText")
const Inbox = makeIcon(HugeInboxIcon, "Inbox")
const Plus = makeIcon(PlusSignIcon, "Plus")
const Search = makeIcon(Search01Icon, "Search")
const ChevronLeftIcon = makeIcon(HugeChevronLeftIcon, "ChevronLeftIcon")
const MoreHorizontalIcon = makeIcon(HugeMoreHorizontalIcon, "MoreHorizontalIcon")
const CircleCheckIconExport = makeIcon(CircleCheckIcon, "CircleCheckIcon")
const OctagonXIcon = makeIcon(HugeOctagonXIcon, "OctagonXIcon")

export {
  ChevronRight,
  MoreHorizontal,
  ChevronDownIcon,
  Loader2Icon,
  PanelLeftIcon,
  ArrowLeft,
  ArrowRight,
  CheckIconExport as CheckIcon,
  ChevronRightIcon,
  CircleIcon,
  XIcon,
  MinusIcon,
  ArrowDownIcon,
  SearchIcon,
  GripVerticalIcon,
  ChevronUpIcon,
  Moon,
  Sun,
  Palette,
  Bold,
  Italic,
  UnderlineExport as Underline,
  Info,
  InfoIcon,
  TriangleAlert,
  TriangleAlertIcon,
  Paperclip,
  FileText,
  Inbox,
  Plus,
  Search,
  ChevronLeftIcon,
  MoreHorizontalIcon,
  CircleCheckIconExport as CircleCheckIcon,
  OctagonXIcon,
}
