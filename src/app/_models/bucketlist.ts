// the Bucketlist model
export class Bucketlist {
    id: number;
    name: string;
    date_created: string;
    date_modified: string;
    created_by: number;
    items: BucketlistItem[];
}

// the BucketlistJson model
export class BucketlistJson {
    items: Bucketlist[];
    items_per_page: number;
    next_page: string;
    page: number;
    prev_page: string;
    total_items: number;
    total_pages: number;
}

// the BucketlistItem model
export class BucketlistItem {
    id: number;
    name: string;
    date_created: string;
    date_modified: Date;
    done: boolean;
    belongs_to: number;
}

// test bucketlist. to show the structure of expected data and to be used in testing
export const testBucketlist = {
    'items': [
        {
            'created_by': 3,
            'date_created': 'Tue, 19 Sep 2017 14:23:42 GMT',
            'date_modified': 'Tue, 19 Sep 2017 14:23:42 GMT',
            'id': 2,
            'items': [],
            'name': 'my awesome adventure'
        }
    ],
    'items_per_page': 20,
    'next_page': null,
    'page': 1,
    'prev_page': '/api/v1/bucketlists?limit=20',
    'total_items': 1,
    'total_pages': 1
};

