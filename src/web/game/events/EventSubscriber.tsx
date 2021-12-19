export interface EventSubscriber {
    subscribe(): any
    unsubscribe(): any
    isSetup(): boolean
}