/**
 * Generates a random eight-digit meeting ID that is guaranteed to not be associated with any previous meeting.
*/
const generateExternalMeetingId = async () => {
    var i = 0;
    while (true) {
        const externalMeetingId = String(Math.floor(10000000 + Math.random() * 90000000));
        console.log(`Generated external meeting ID ${externalMeetingId}`);
        
        const activeMeetings = await getActiveMeetings();
        var idValid = true;
        for (var activeMeeting of activeMeetings) {
            if (activeMeeting.external_meeting_id === externalMeetingId) {
                // We have a duplicate external meeting ID (should happen 
                // extremely rarely).
                console.warn(`External meeting ID ${externalMeetingId} already used by an active meeting!`);
                idValid = false;
            }
        }

        if (idValid) {
            return externalMeetingId;
        }

        i++;
        if (i > 100) {
            console.error(`Breaking out of loop because max iterations exceeded...`);
            throw new Error("Too many iterations of external meeting ID");
        }
    }
}

const getActiveMeetings = async () => {
    const params = {
        TableName: 'meeting-detail',
        IndexName: 'meetingStatusGsi',
        KeyConditionExpression: 'meeting_status = :hkey',
        ExpressionAttributeValues: {
            ':hkey': MeetingStatus.ACTIVE.toString(),
        }
    };

    const scanResults = [];
    var items;
    do {
        items = await this.db.query(params).promise();
        items.Items?.forEach((item) => scanResults.push(item));
        params["ExclusiveStartKey"] = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");

    return scanResults;
}

exports.handler = async () => {
    return await generateExternalMeetingId();
};
