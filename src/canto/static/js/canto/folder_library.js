let initializeFolderLibrary = function (selector, tree_url, album_url, binary_url, search_url, detail_url) {
    Vue.component('treeselect', VueTreeselect.Treeselect);

    var library = new Vue({
        el: selector,
        template: '<div class="library">' +
            '<h2 class="tree-label">Select an album</h2>\n' +
            '<treeselect\n' +
            ':multiple="false"\n' +
            ':normalizer="normalizeTreeNode"\n' +
            ':options="tree"\n' +
            ':disable-branch-nodes="true"\n' +
            'placeholder="Select an album"\n' +
            ':value="selectedAlbumId"' +
            '@input="onAlbumSelect"'+
            '></treeselect>\n' +
            '<h2 class="search-label">Search</h2>\n' +
            '<search :query="query" :on-search="onSearch"></search>\n' +
            '<results :url="resultsUrl"></results>\n' +
            '</div>',
        data: {
            selectedAlbumId: null,
            tree: null,
            query: null,
            resultsUrl: null,
        },
        created: function () {
            let that = this;
            fetch(tree_url, {credentials: 'same-origin'}).then(function (response) {
                return response.json();
            }).then(function (data) {
                that.tree = data.results;
            })
        },
        methods: {
            buildResultsUrl: function () {
                if(this.selectedAlbumId !== null && this.selectedAlbumId !== undefined) {
                    return album_url.replace("ID-PLACEHOLDER", this.selectedAlbumId);
                }
                if(this.query !== null && this.query !== undefined) {
                    return search_url.replace("QUERY-PLACEHOLDER", this.query);
                }
                return null;
            },

            onAlbumSelect: function (id) {
                this.selectedAlbumId = id;
                if(id !== null && id !== undefined) {
                    this.query = null;
                }
                this.resultsUrl = this.buildResultsUrl();
            },
            normalizeTreeNode: function normalizeTreeNode(node) {
                let label = node.name;
                if(node.scheme === 'album') {
                    label = "📷 " + node.name;
                }
                // do not allow selecting empty albums or empty categories
                let isDisabled = (
                    (node.scheme !== 'album' && (node.children === undefined || node.children.length === 0))
                    || (node.scheme === 'album' && node.size === "0")
                );

                return {id: node.id, label: label, children: node.children, isDisabled: isDisabled}
            }
        },

    })
};
