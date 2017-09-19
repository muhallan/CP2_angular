export class Bucketlist {
    bucketlistId: number;
    bucketlistName: string;
    dateCreated: string;
    dateModified: string;
    createdByUserId: number;
    bucketlistItems: BucketlistItem[];
}

export class BucketlistJson {
    items: Bucketlist[];
    itemsPerPage: number;
    nextPage: number;
    page: number;
    prevPage: number;
    totalItems: number;
    totalPages: number;
}

export class BucketlistItem {
    itemId: number;
    itemName: string;
    date_created: string;
    date_modified: string;
    done: boolean;
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
