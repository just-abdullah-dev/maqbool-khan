export default function getSearchParams (req) {
    const url = new URL(req?.url);
    const searchParams = new URLSearchParams(url?.searchParams);
    return searchParams;
}