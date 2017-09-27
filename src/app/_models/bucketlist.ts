export class Bucketlist {
    id: number;
    name: string;
    date_created: string;
    date_modified: string;
    created_by: number;
    items: BucketlistItem[];
}

export class BucketlistJson {
    items: Bucketlist[];
    items_per_page: number;
    next_page: number;
    page: number;
    prev_page: number;
    total_items: number;
    total_pages: number;
}

export class BucketlistItem {
    id: number;
    name: string;
    date_created: string;
    date_modified: string;
    done: boolean;
    belongs_to: number;
}

/*
{
    "items":[
        {
            "created_by":3,
            "date_created":"Tue, 19 Sep 2017 14:23:42 GMT",
            "date_modified":"Tue, 19 Sep 2017 14:23:42 GMT",
            "id":2,
            "items":[],
            "name":"my awesome adventure"
        }
    ],
    "items_per_page":20,
    "next_page":null,
    "page":1,
    "prev_page":"/api/v1/bucketlists?limit=20",
    "total_items":1,
    "total_pages":1
}
*/
