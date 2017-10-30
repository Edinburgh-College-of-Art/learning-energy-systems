<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Edit App Student'), ['action' => 'edit', $appStudent->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete App Student'), ['action' => 'delete', $appStudent->id], ['confirm' => __('Are you sure you want to delete # {0}?', $appStudent->id)]) ?> </li>
        <li><?= $this->Html->link(__('List App Students'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New App Student'), ['action' => 'add']) ?> </li>
    </ul>
</div>
<div class="appStudents view large-10 medium-9 columns">
    <h2><?= h($appStudent->name) ?></h2>
    <div class="row">
        <div class="large-5 columns strings">
            <h6 class="subheader"><?= __('Name') ?></h6>
            <p><?= h($appStudent->name) ?></p>
        </div>
        <div class="large-2 columns numbers end">
            <h6 class="subheader"><?= __('Id') ?></h6>
            <p><?= $this->Number->format($appStudent->id) ?></p>
            <h6 class="subheader"><?= __('School Name') ?></h6>
            <p><?= $appStudent->school->school_name ?></p>
            <h6 class="subheader"><?= __('School ID') ?></h6>
            <p><?= $this->Number->format($appStudent->app_school_id) ?></p>
            <p><?= h($appStudent->school_name) ?></p>
            <h6 class="subheader"><?= __('Year') ?></h6>
            <p><?= $this->Number->format($appStudent->year) ?></p>
        </div>
    </div>
</div>
