export type Listing = {
    id: number,
    title: string,
    images: string[],
    location: string,
    suggestedMinimumBid: number,
    description: string,
    extLink?: string,
    creatorId: number,
    highestBid?: number,
}
