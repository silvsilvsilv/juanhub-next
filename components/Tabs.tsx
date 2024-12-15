// components/Tabs.tsx
import * as Tabs from "@radix-ui/react-tabs";

export function MusicTabs() {
  return (
    <Tabs.Root defaultValue="music">
      <Tabs.List className="flex space-x-4">
        <Tabs.Trigger value="music" className="text-white">Music</Tabs.Trigger>
        <Tabs.Trigger value="podcasts" className="text-white">Podcasts</Tabs.Trigger>
        <Tabs.Trigger value="live" className="text-white">Live</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
