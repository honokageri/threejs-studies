export type Cleanup = () => void;

export type DemoContext = {
    container: HTMLElement;
};

export type Demo = {
    id: string;
    title: string;
    description?: string;
    start: (context: DemoContext) => Cleanup;
};