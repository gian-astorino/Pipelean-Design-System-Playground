"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  ChevronRight,
  Info,
  Paperclip,
  FileText,
  Inbox,
  Plus,
  Search,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Attachment,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Bubble, BubbleGroup } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DirectionProvider } from "@/components/ui/direction";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Message, MessageAvatar, MessageContent, MessageGroup } from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/* ---------------------------------------------------------------------
   Layout
   --------------------------------------------------------------------- */

function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="max-w-sm overflow-hidden rounded-md">
      <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-medium text-white">
        16 / 9
      </div>
    </AspectRatio>
  );
}

function ResizableDemo() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="h-40 max-w-md rounded-lg border">
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-4 text-sm">Sidebar</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center p-4 text-sm">Contenuto</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-40 w-56 rounded-md border p-3">
      <div className="flex flex-col gap-2 text-sm">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i}>Step della pipeline #{i + 1}</div>
        ))}
      </div>
    </ScrollArea>
  );
}

function SeparatorDemo() {
  return (
    <div>
      <div className="text-sm">
        <div className="font-medium">Pipelean</div>
        <div className="text-muted-foreground">Design system</div>
      </div>
      <Separator className="my-3" />
      <div className="flex h-5 items-center gap-3 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Componenti</span>
        <Separator orientation="vertical" />
        <span>Token</span>
      </div>
    </div>
  );
}

function SidebarDemo() {
  return (
    <SidebarProvider className="h-[360px] min-h-0 w-full max-w-md overflow-hidden rounded-lg border">
      <Sidebar collapsible="none" className="w-48">
        <SidebarHeader className="text-sm font-medium">Pipelean</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Pipeline</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {["Overview", "Runs", "Settings"].map((label) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton isActive={label === "Runs"}>{label}</SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-4 text-sm text-muted-foreground">Contenuto pagina</SidebarInset>
    </SidebarProvider>
  );
}

function SkeletonDemo() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Navigazione
   --------------------------------------------------------------------- */

function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Pipelean</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Pipeline</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Run #128</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Nuova pipeline</MenubarItem>
          <MenubarItem>Apri run…</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Modifica</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Duplica step</MenubarItem>
          <MenubarItem>Elimina step</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Pipeline</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-1 p-2">
              <li>
                <NavigationMenuLink href="#">Overview</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Run history</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Impostazioni</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {[1, 2, 3].map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href="#" isActive={p === 2}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-72">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="logs">Log</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-sm text-muted-foreground">
        Stato attuale della pipeline.
      </TabsContent>
      <TabsContent value="logs" className="text-sm text-muted-foreground">
        Ultime righe di log del run.
      </TabsContent>
    </Tabs>
  );
}

/* ---------------------------------------------------------------------
   Form & Input
   --------------------------------------------------------------------- */

function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Grassetto">
        <Bold />
      </Button>
      <Button variant="outline" size="icon" aria-label="Corsivo">
        <Italic />
      </Button>
      <Button variant="outline" size="icon" aria-label="Sottolineato">
        <UnderlineIcon />
      </Button>
    </ButtonGroup>
  );
}

function CheckboxDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="demo-notify" defaultChecked />
      <Label htmlFor="demo-notify">Notifica al termine del run</Label>
    </div>
  );
}

const COMBOBOX_ITEMS = ["Neutral", "Slate", "Zinc", "Stone", "Gray"];

function ComboboxDemo() {
  return (
    <Combobox items={COMBOBOX_ITEMS}>
      <ComboboxInput placeholder="Base color…" className="w-56" />
      <ComboboxContent>
        <ComboboxEmpty>Nessun risultato.</ComboboxEmpty>
        <ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function FieldDemo() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="demo-pipeline-name">Nome pipeline</FieldLabel>
        <Input id="demo-pipeline-name" placeholder="es. deploy-produzione" />
        <FieldDescription>Visibile solo al tuo team.</FieldDescription>
      </Field>
    </FieldGroup>
  );
}

function InputDemo() {
  return <Input placeholder="Cerca pipeline…" className="max-w-sm" />;
}

function InputGroupDemo() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Cerca…" />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}

function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

function LabelDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="demo-label" />
      <Label htmlFor="demo-label">Accetto i termini</Label>
    </div>
  );
}

function NativeSelectDemo() {
  return (
    <NativeSelect defaultValue="eu-west" className="max-w-xs">
      <NativeSelectOption value="eu-west">eu-west-1</NativeSelectOption>
      <NativeSelectOption value="us-east">us-east-1</NativeSelectOption>
      <NativeSelectOption value="ap-south">ap-south-1</NativeSelectOption>
    </NativeSelect>
  );
}

function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="staging" className="flex flex-col gap-2">
      {["staging", "production"].map((v) => (
        <div key={v} className="flex items-center gap-2">
          <RadioGroupItem value={v} id={`demo-${v}`} />
          <Label htmlFor={`demo-${v}`} className="capitalize">
            {v}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function SelectDemo() {
  return (
    <Select defaultValue="warning">
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="success">Success</SelectItem>
        <SelectItem value="warning">Warning</SelectItem>
        <SelectItem value="info">Info</SelectItem>
      </SelectContent>
    </Select>
  );
}

function SliderDemo() {
  return <Slider defaultValue={[60]} max={100} step={1} className="w-56" />;
}

function SwitchDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="demo-switch" defaultChecked />
      <Label htmlFor="demo-switch">Auto-retry</Label>
    </div>
  );
}

function TextareaDemo() {
  return <Textarea placeholder="Descrivi il problema…" className="max-w-sm" />;
}

function ToggleDemo() {
  return (
    <Toggle aria-label="Grassetto">
      <Bold />
    </Toggle>
  );
}

function ToggleGroupDemo() {
  return (
    <ToggleGroup type="single" defaultValue="bold">
      <ToggleGroupItem value="bold" aria-label="Grassetto">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Corsivo">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Sottolineato">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

/* ---------------------------------------------------------------------
   Overlay
   --------------------------------------------------------------------- */

function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Elimina pipeline</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
          <AlertDialogDescription>
            L&apos;operazione non è reversibile. La pipeline e la sua history verranno eliminate.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction>Elimina</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-24 w-56 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Click destro qui
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Rilancia run</ContextMenuItem>
        <ContextMenuItem>Duplica</ContextMenuItem>
        <ContextMenuItem variant="destructive">Elimina</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nuova pipeline</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuova pipeline</DialogTitle>
          <DialogDescription>Configura una nuova pipeline di deploy.</DialogDescription>
        </DialogHeader>
        <Input placeholder="Nome pipeline" />
        <DialogFooter>
          <Button>Crea</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Apri drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Dettagli run</DrawerTitle>
          <DrawerDescription>Run #128 — completato con successo.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Chiudi</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Azioni</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Rilancia</DropdownMenuItem>
        <DropdownMenuItem>Duplica</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Elimina</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@pipelean-bot</Button>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm">
        Account di servizio che esegue i deploy automatici.
      </HoverCardContent>
    </HoverCard>
  );
}

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Filtri</Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 text-sm">Filtra i run per stato ed autore.</PopoverContent>
    </Popover>
  );
}

function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Apri pannello</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Impostazioni pipeline</SheetTitle>
          <SheetDescription>Modifica trigger e notifiche.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Chiudi</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>Rilancia questo step</TooltipContent>
    </Tooltip>
  );
}

/* ---------------------------------------------------------------------
   Data display
   --------------------------------------------------------------------- */

function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Cos&apos;è un token semantico?</AccordionTrigger>
        <AccordionContent>Un ruolo con un nome (es. primary) che punta a un token base.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Come personalizzo il brand?</AccordionTrigger>
        <AccordionContent>Cambia la rampa --color-brand-* in globals.css.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function AvatarDemo() {
  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarFallback>PL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  );
}

function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}

function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />;
}

function CardDemo() {
  return (
    <Card className="w-64">
      <CardHeader>
        <CardTitle>Run #128</CardTitle>
        <CardDescription>deploy-produzione</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">Completato in 42s.</CardContent>
    </Card>
  );
}

function CarouselDemo() {
  return (
    <Carousel className="w-64">
      <CarouselContent>
        {[1, 2, 3].map((n) => (
          <CarouselItem key={n}>
            <div className="flex h-32 items-center justify-center rounded-md border bg-muted text-2xl font-semibold">
              {n}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

const chartData = [
  { day: "Lun", runs: 12 },
  { day: "Mar", runs: 18 },
  { day: "Mer", runs: 9 },
  { day: "Gio", runs: 22 },
  { day: "Ven", runs: 15 },
];

const chartConfig = {
  runs: { label: "Run", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-48 w-full max-w-md">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="runs" fill="var(--color-runs)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

function CollapsibleDemo() {
  return (
    <Collapsible className="w-64">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Step opzionali
          <ChevronRight className="size-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 text-sm text-muted-foreground">
        Lint, test e build parallela.
      </CollapsibleContent>
    </Collapsible>
  );
}

function EmptyDemo() {
  return (
    <Empty className="max-w-sm border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>Nessun run trovato</EmptyTitle>
        <EmptyDescription>Questa pipeline non è ancora stata eseguita.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Esegui ora</Button>
      </EmptyContent>
    </Empty>
  );
}

function ItemDemo() {
  return (
    <ItemGroup className="max-w-md gap-2">
      <Item variant="outline">
        <ItemMedia>
          <FileText className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>deploy.yml</ItemTitle>
          <ItemDescription>Aggiornato 2h fa</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="ghost">
            Apri
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  );
}

function KbdDemo() {
  return (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  );
}

function MarkerDemo() {
  return (
    <div className="flex flex-col gap-1">
      <Marker>
        <MarkerIcon>
          <ChevronRight className="size-4" />
        </MarkerIcon>
        <MarkerContent>Build completata</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <ChevronRight className="size-4" />
        </MarkerIcon>
        <MarkerContent>Deploy in corso</MarkerContent>
      </Marker>
    </div>
  );
}

function TableDemo() {
  const rows = [
    { run: "#128", status: "Success", duration: "42s" },
    { run: "#127", status: "Failed", duration: "12s" },
  ];
  return (
    <Table>
      <TableCaption>Ultimi run della pipeline.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Run</TableHead>
          <TableHead>Stato</TableHead>
          <TableHead className="text-right">Durata</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.run}>
            <TableCell>{r.run}</TableCell>
            <TableCell>{r.status}</TableCell>
            <TableCell className="text-right">{r.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/* ---------------------------------------------------------------------
   Feedback
   --------------------------------------------------------------------- */

function AlertDemo() {
  return (
    <Alert className="max-w-md">
      <Info />
      <AlertTitle>Nuova versione disponibile</AlertTitle>
      <AlertDescription>Aggiorna la CLI di Pipelean alla 2.4.0.</AlertDescription>
    </Alert>
  );
}

function ProgressDemo() {
  return <Progress value={66} className="w-56" />;
}

function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.success("Pipeline avviata", { description: "deploy-produzione · run #129" })
      }
    >
      Mostra toast
    </Button>
  );
}

function SpinnerDemo() {
  return <Spinner className="size-6" />;
}

/* ---------------------------------------------------------------------
   AI / Chat
   --------------------------------------------------------------------- */

function AttachmentDemo() {
  return (
    <Attachment className="max-w-sm">
      <AttachmentMedia>
        <Paperclip />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>deploy-log.txt</AttachmentTitle>
        <AttachmentDescription>12 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <Button size="icon-xs" variant="ghost" aria-label="Rimuovi">
          <Plus className="rotate-45" />
        </Button>
      </AttachmentActions>
    </Attachment>
  );
}

function BubbleDemo() {
  return (
    <BubbleGroup className="max-w-sm">
      <Bubble align="start">
        <div data-slot="bubble-content" className="rounded-lg px-3 py-2 text-sm">
          La pipeline è pronta per il deploy?
        </div>
      </Bubble>
      <Bubble align="end">
        <div data-slot="bubble-content" className="rounded-lg px-3 py-2 text-sm">
          Sì, tutti i check sono verdi.
        </div>
      </Bubble>
    </BubbleGroup>
  );
}

function MessageDemo() {
  return (
    <MessageGroup className="max-w-sm">
      <Message align="start">
        <MessageAvatar>
          <Avatar className="size-8">
            <AvatarFallback>PB</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <div className="rounded-lg bg-muted px-3 py-2 text-sm">Run #128 completato con successo.</div>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}

function MessageScrollerDemo() {
  return (
    <MessageScrollerProvider>
      <MessageScroller className="h-40 max-w-sm rounded-lg border">
        <MessageScrollerViewport>
          <MessageScrollerContent>
            {Array.from({ length: 6 }, (_, i) => (
              <MessageScrollerItem key={i}>
                <div className="rounded-lg bg-muted px-3 py-2 text-sm">Messaggio #{i + 1}</div>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  );
}

/* ---------------------------------------------------------------------
   Comandi & utility
   --------------------------------------------------------------------- */

function CommandDemo() {
  return (
    <Command className="max-w-sm rounded-lg border">
      <CommandInput placeholder="Cerca un comando…" />
      <CommandList>
        <CommandEmpty>Nessun risultato.</CommandEmpty>
        <CommandGroup heading="Pipeline">
          <CommandItem>Avvia run</CommandItem>
          <CommandItem>Duplica pipeline</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function DirectionDemo() {
  return (
    <DirectionProvider dir="rtl">
      <div dir="rtl" className="flex max-w-sm items-center gap-2 rounded-md border p-3 text-sm">
        <Badge>حالة</Badge>
        <span>هذا الاتجاه من اليمين إلى اليسار.</span>
      </div>
    </DirectionProvider>
  );
}

const demoRegistry: Record<string, React.ComponentType> = {
  "aspect-ratio": AspectRatioDemo,
  resizable: ResizableDemo,
  "scroll-area": ScrollAreaDemo,
  separator: SeparatorDemo,
  sidebar: SidebarDemo,
  skeleton: SkeletonDemo,
  breadcrumb: BreadcrumbDemo,
  menubar: MenubarDemo,
  "navigation-menu": NavigationMenuDemo,
  pagination: PaginationDemo,
  tabs: TabsDemo,
  button: ButtonDemo,
  "button-group": ButtonGroupDemo,
  checkbox: CheckboxDemo,
  combobox: ComboboxDemo,
  field: FieldDemo,
  input: InputDemo,
  "input-group": InputGroupDemo,
  "input-otp": InputOTPDemo,
  label: LabelDemo,
  "native-select": NativeSelectDemo,
  "radio-group": RadioGroupDemo,
  select: SelectDemo,
  slider: SliderDemo,
  switch: SwitchDemo,
  textarea: TextareaDemo,
  toggle: ToggleDemo,
  "toggle-group": ToggleGroupDemo,
  "alert-dialog": AlertDialogDemo,
  "context-menu": ContextMenuDemo,
  dialog: DialogDemo,
  drawer: DrawerDemo,
  "dropdown-menu": DropdownMenuDemo,
  "hover-card": HoverCardDemo,
  popover: PopoverDemo,
  sheet: SheetDemo,
  tooltip: TooltipDemo,
  accordion: AccordionDemo,
  avatar: AvatarDemo,
  badge: BadgeDemo,
  calendar: CalendarDemo,
  card: CardDemo,
  carousel: CarouselDemo,
  chart: ChartDemo,
  collapsible: CollapsibleDemo,
  empty: EmptyDemo,
  item: ItemDemo,
  kbd: KbdDemo,
  marker: MarkerDemo,
  table: TableDemo,
  alert: AlertDemo,
  progress: ProgressDemo,
  sonner: SonnerDemo,
  spinner: SpinnerDemo,
  attachment: AttachmentDemo,
  bubble: BubbleDemo,
  message: MessageDemo,
  "message-scroller": MessageScrollerDemo,
  command: CommandDemo,
  direction: DirectionDemo,
};

/** Looks up and renders a demo by slug — the lookup happens inside this
 *  client component (not in the server page) because a Server Component
 *  can only cross the client boundary through JSX composition, not by
 *  indexing into a plain object exported from a "use client" module. */
export function ComponentDemo({ slug }: { slug: string }) {
  const Demo = demoRegistry[slug];
  if (!Demo) {
    return <p className="text-sm text-muted-foreground">Demo non disponibile.</p>;
  }
  return <Demo />;
}
