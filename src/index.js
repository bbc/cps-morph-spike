function getCurationInfo (morph) {
    return morph.request({
        curation: {
           uri: {
               service: 'curation',
               path: '/streammetadata/' + morph.props.tag
           },
           requireSuccess: true
        }
    })
};

function getLdpInfo (morph) {
    return morph.request({
        ldp: {
           uri: {
               service: 'ldp-core',
               path: '/tag-concepts',
               query: {'uri': morph.props.tag}
           },
           requireSuccess: true
        }
    })
};

exports.render = function(morph) {
    if (!morph.props.tag) {
        return {
            body: {
                message: 'You have not specified a tag'
            }
        };
    }

    return Promise.all([getCurationInfo(morph), getLdpInfo(morph)])
        .then((responses) => {
            var curation = responses[0].curation.body
            var ldp = responses[1].ldp.body

            var curationMode = JSON.parse(curation)["curationMode"]
            var labels = JSON.parse(ldp)["results"][0]["core:label"]

            return {
                body: {curation: curationMode, ldp: labels}
            }
        })
};