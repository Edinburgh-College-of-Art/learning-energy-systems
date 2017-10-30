<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('New App Student'), ['action' => 'add']) ?></li>
    </ul>
</div>
<div class="appStudents index large-10 medium-9 columns">
    <table cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th><?= $this->Paginator->sort('id') ?></th>
            <th><?= $this->Paginator->sort('name') ?></th>
            <th><?= $this->Paginator->sort('school_name') ?></th>
            <th><?= $this->Paginator->sort('year') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
    </thead>
    <tbody>
    <?php foreach ($appStudents as $appStudent): ?>
        <tr>
            <td><?= $this->Number->format($appStudent->id) ?></td>
            <td><?= h($appStudent->name) ?></td>
            <td><?= h($appStudent->school->school_name) ?></td>
            <td><?= $this->Number->format($appStudent->year) ?></td>
            <td class="actions">
                <?= $this->Html->link(__('View'), ['action' => 'view', $appStudent->id]) ?>
                <?= $this->Html->link(__('Edit'), ['action' => 'edit', $appStudent->id]) ?>
                <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $appStudent->id], ['confirm' => __('Are you sure you want to delete # {0}?', $appStudent->id)]) ?>
            </td>
        </tr>

    <?php endforeach; ?>
    </tbody>
    </table>
    <div class="paginator">
        <ul class="pagination">
            <?= $this->Paginator->prev('< ' . __('previous')) ?>
            <?= $this->Paginator->numbers() ?>
            <?= $this->Paginator->next(__('next') . ' >') ?>
        </ul>
        <p><?= $this->Paginator->counter() ?></p>
    </div>
</div>
