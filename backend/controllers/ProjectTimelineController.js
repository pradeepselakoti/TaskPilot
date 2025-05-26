import Task from "../models/Task.js";

export const getTimeline = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Project ID is required'
            });
        }

        const timelines = await Task.find({ project_id: id },{project_id: 1,start_date: 1, end_date: 1, status: 1,assigned_to: 1})
        .populate('assigned_to', 'first_name last_name temp_role').lean();

        timelines.map(task => {
            task.member_id = task.assigned_to._id;
            task.member_name = `${task.assigned_to.first_name} ${task.assigned_to.last_name}`;
            task.member_role = task.assigned_to.temp_role;

            delete task.assigned_to;
            return task;

        });
            
        return res.status(200).json({
            success: true,
            data: timelines
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving project timeline',
            error: error.message
        });
    }
};