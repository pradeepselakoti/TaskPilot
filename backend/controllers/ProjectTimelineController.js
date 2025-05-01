import ProjectTimeline from '../models/ProjectTimeline.js';

export const getTimeline = async (req, res) => {
    try {
        const { projectId } = req.params;

        const timeline = await ProjectTimeline.findOne({ project_id: projectId })
            .populate({
                path: 'task_updates.task_id',
                select: 'title description due_date'
            })
            .populate({
                path: 'project_id',
                select: 'name start_date end_date'
            });

        if (!timeline) {
            return res.status(404).json({ 
                success: false, 
                message: 'Timeline not found for this project' 
            });
        }

        return res.status(200).json({
            success: true,
            data: timeline
        });
        if (!timeline) {
            return res.status(404).json({ 
            success: false, 
            error: 'Timeline not found for this project' 
            });
        }

        return res.status(200).json({
            success: true,
            data: timeline
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving project timeline',
            error: error.message
        });
    }
};